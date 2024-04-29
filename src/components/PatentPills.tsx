import { legalStatusColourScale, metaNoticeColourScale } from '@/theme'
import { useTranslation } from 'react-i18next'
import colors from 'tailwindcss/colors'
import { PatentDocument } from '../models/PatentDocument'
import { Pill } from './ui/Pill'

export function PatentPills({ doc }: { doc: PatentDocument }) {
  const { t } = useTranslation();
  const { patent_status: legalStatus } = doc.legal_status
  const legalStatusColor = legalStatusColourScale[legalStatus]
  return (
    <>
      {doc.legal_status.patent_status && (
        <Pill color={legalStatusColor || colors.slate['700']}>{t(`legal.status.${doc.legal_status.patent_status}`)}</Pill>
      )}
      {doc.has_claim && <Pill color={colors.red['500']}>{t('Has Claim')}</Pill>}
      {doc.has_abstract && <Pill color={colors.blue['500']}>{t('Has Abstract')}</Pill>}
      {doc.has_sequence && <Pill color={metaNoticeColourScale.BIO}>{t('Has Sequence')}</Pill>}
    </>
  )
}
