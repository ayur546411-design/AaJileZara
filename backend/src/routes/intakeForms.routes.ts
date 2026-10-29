import { Router, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// 1. Get active intake form configuration
router.get('/config', async (_req, res: Response) => {
  try {
    const config = await prisma.intakeFormConfig.findFirst({
      where: { isActive: true },
      orderBy: { version: 'desc' },
    });

    if (!config) {
      // Default fallback
      res.json({
        success: true,
        fields: [
          { id: 'clientName', label: 'Full Legal Name', type: 'text', required: true },
          { id: 'clientEmail', label: 'Email Address', type: 'email', required: true },
          { id: 'clientPhone', label: 'Mobile / WhatsApp Number', type: 'tel', required: true },
          { id: 'clientCategory', label: 'Client Category', type: 'select', options: ['Student', 'Homemaker / Housewife', 'Working Professional', 'Other Individual'], required: true },
          { id: 'preferredLanguage', label: 'Preferred Language', type: 'select', options: ['Hindi', 'English', 'Gujarati', 'Marathi'], required: true },
          { id: 'concernSummary', label: 'Brief description of the life challenge or emotional dynamic', type: 'textarea', required: true, maxWords: 250 },
          { id: 'ageEligibility', label: 'I confirm that I am 18 years of age or older', type: 'checkbox', required: true },
          { id: 'medicalDisclaimer', label: 'I understand Ji Le Zara provides social and personal guidance, not medical/psychiatric diagnosis or emergency treatment.', type: 'checkbox', required: true },
        ],
        wordLimits: {
          concernSummary: 250,
        },
      });
      return;
    }

    res.json({
      success: true,
      configId: config.id,
      version: config.version,
      fields: JSON.parse(config.fieldsConfig),
      wordLimits: JSON.parse(config.wordLimits),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Admin: Update intake form configuration & word limits
router.post('/config', requireAuth, requireRole(['ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { fields, wordLimits, categoryId } = req.body;

    const latest = await prisma.intakeFormConfig.findFirst({
      orderBy: { version: 'desc' },
    });
    const nextVersion = (latest?.version || 0) + 1;

    const newConfig = await prisma.intakeFormConfig.create({
      data: {
        categoryId: categoryId || null,
        fieldsConfig: JSON.stringify(fields),
        wordLimits: JSON.stringify(wordLimits || { concernSummary: 250 }),
        version: nextVersion,
        isActive: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: req.user?.id,
        actorRole: req.user?.role,
        action: 'INTAKE_FORM_CONFIG_UPDATED',
        entityType: 'INTAKE_CONFIG',
        entityId: newConfig.id,
        details: JSON.stringify({ version: nextVersion }),
      },
    });

    res.status(201).json({
      success: true,
      config: newConfig,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
