-- ==========================================================
-- JI LE ZARA SOCIAL GUIDANCE PLATFORM
-- Azure Database for PostgreSQL - Initial Schema Migration
-- ==========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'CLIENT', -- 'CLIENT', 'ADVISOR', 'ADMIN'
    client_category VARCHAR(50) NOT NULL DEFAULT 'OTHER', -- 'STUDENT', 'HOMEMAKER', 'PROFESSIONAL', 'OTHER'
    is_verified_student BOOLEAN NOT NULL DEFAULT FALSE,
    student_doc_url TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Advisors Table
CREATE TABLE IF NOT EXISTS advisors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    specializations JSONB NOT NULL DEFAULT '[]'::jsonb,
    languages JSONB NOT NULL DEFAULT '[]'::jsonb,
    max_weekly_hours INT NOT NULL DEFAULT 20,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Service Categories (7 Areas of Life)
CREATE TABLE IF NOT EXISTS service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    icon VARCHAR(100) NOT NULL DEFAULT 'Compass',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Packages & Pricing (Plan A Direct Guidance & Plan B Advisory Support)
CREATE TABLE IF NOT EXISTS packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    plan_type VARCHAR(50) NOT NULL DEFAULT 'DIRECT_GUIDANCE', -- 'DIRECT_GUIDANCE', 'ADVISORY_SUPPORT'
    description TEXT NOT NULL,
    base_price NUMERIC(10, 2) NOT NULL DEFAULT 1500.00,
    student_price NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
    homemaker_price NUMERIC(10, 2) NOT NULL DEFAULT 1000.00,
    professional_price NUMERIC(10, 2) NOT NULL DEFAULT 2000.00,
    duration_minutes INT NOT NULL DEFAULT 60,
    sessions_count INT NOT NULL DEFAULT 1,
    validity_days INT NOT NULL DEFAULT 30,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_approved BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Bookings
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_ref VARCHAR(100) UNIQUE NOT NULL,
    session_uid UUID UNIQUE DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    advisor_id UUID REFERENCES advisors(id) ON DELETE SET NULL,
    package_id UUID REFERENCES packages(id) ON DELETE SET NULL,
    category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
    session_type VARCHAR(50) NOT NULL DEFAULT 'LIVE_VIDEO', -- 'LIVE_VIDEO', 'PHONE_CALL'
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    end_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED', -- 'SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'
    buffer_minutes INT NOT NULL DEFAULT 15,
    intake_answers JSONB,
    timezone VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',
    notes TEXT,
    client_phone VARCHAR(50),
    client_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Prevent overlapping bookings for same advisor
CREATE INDEX IF NOT EXISTS idx_bookings_advisor_schedule 
ON bookings (advisor_id, scheduled_at, end_at) 
WHERE status IN ('SCHEDULED', 'CONFIRMED');

-- 6. Advisory Requests (Plan B)
CREATE TABLE IF NOT EXISTS advisory_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_ref VARCHAR(100) UNIQUE NOT NULL,
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    assigned_advisor_id UUID REFERENCES advisors(id) ON DELETE SET NULL,
    category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
    concern_summary TEXT NOT NULL,
    preferred_language VARCHAR(50) NOT NULL DEFAULT 'Hindi',
    preferred_contact VARCHAR(50) NOT NULL DEFAULT 'Phone',
    status VARCHAR(50) NOT NULL DEFAULT 'NEW', -- 'NEW', 'REVIEWED', 'ASSIGNED', 'INTRO_SCHEDULED', 'RECOMMENDED', 'CLOSED'
    internal_notes TEXT,
    client_recommendations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Live Session Rooms (Daily Video SDK Integration)
CREATE TABLE IF NOT EXISTS live_session_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    room_name VARCHAR(255) NOT NULL,
    room_url TEXT NOT NULL,
    daily_room_id VARCHAR(255),
    session_card_uid VARCHAR(255) UNIQUE NOT NULL,
    token_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    recording_consent_given BOOLEAN NOT NULL DEFAULT FALSE,
    recording_status VARCHAR(50) NOT NULL DEFAULT 'DISABLED', -- 'DISABLED', 'ACTIVE', 'STOPPED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Session Recordings (Admin Only, 90-day retention)
CREATE TABLE IF NOT EXISTS session_recordings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    live_session_id UUID NOT NULL REFERENCES live_session_rooms(id) ON DELETE CASCADE,
    blob_storage_url TEXT NOT NULL,
    blob_name VARCHAR(255) NOT NULL,
    duration_seconds INT NOT NULL DEFAULT 0,
    retention_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    consent_audit JSONB NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'RECORDED', -- 'RECORDED', 'ARCHIVED', 'DELETED'
    deleted_at TIMESTAMP WITH TIME ZONE,
    access_logs JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Payments
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    status VARCHAR(50) NOT NULL DEFAULT 'COMPLETED', -- 'PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'
    transaction_ref VARCHAR(255) UNIQUE NOT NULL,
    gateway VARCHAR(100) NOT NULL DEFAULT 'RAZORPAY_AZURE',
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Intake Form Configuration & Word Limits
CREATE TABLE IF NOT EXISTS intake_form_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES service_categories(id) ON DELETE CASCADE,
    fields_config JSONB NOT NULL,
    word_limits JSONB NOT NULL,
    version INT NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Infrastructure Cost Management (Azure & Operating Costs)
CREATE TABLE IF NOT EXISTS cost_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    estimated_monthly_inr NUMERIC(10, 2) NOT NULL,
    actual_billed_inr NUMERIC(10, 2),
    usage_quantity VARCHAR(100) NOT NULL,
    month_year VARCHAR(20) NOT NULL,
    notes TEXT,
    budget_limit_inr NUMERIC(10, 2) NOT NULL DEFAULT 5000.00,
    is_actual_invoice BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Security Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID,
    actor_role VARCHAR(50),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(255),
    details JSONB,
    ip_address VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
