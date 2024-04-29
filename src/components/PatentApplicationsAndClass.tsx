import { Applicant } from "@/models/Applicant";
import { Class } from "@/models/Class";
import { PatentDocument } from "@/models/PatentDocument";
import { theme } from "@/theme";
import { FC } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { gray } from "tailwindcss/colors";
import { Pill } from "./ui/Pill";

const FormatName: FC<{ name: string; residence?: string }> = ({
  name,
  residence
}) => (
  <p className={'flex items-center'}>
    <span className={'mr-1'} style={{ color: theme.brand }} >{'>'}</span>
    <span className={'mr-1'}>{name}</span>
    {residence && <ReactCountryFlag countryCode={residence} svg />}
  </p>
)

const FormatApplicant: FC<{applicant: Applicant[], label: string}> = ({ applicant, label }) => {
  const { t } = useTranslation();
  return (
    <div className={'mt-5'}>
      <h2 className={'font-semibold'}>{t(label, { count: applicant.length })}</h2>
      {applicant.map(({ name, residence }, i) => <FormatName key={`${label}-${name}-${i}`} name={name} residence={residence} />)}
    </div>
  )
}

const FormatClass: FC<{ class: Class[]; label: string }> = ({ class: classItem, label }) => {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t(`class.${label}`)}</h2>
      <div className={'flex flex-wrap'}>
        {classItem.map(({ symbol }) => (
          <span className={'my-0.5'}>
            <Pill
              key={`pill-${symbol}`}
              color={gray[500]}
            >
              {symbol}
            </Pill>
          </span>
        ))}
      </div>
    </>
  )
}

export const PatentApplicationsAndClaims: FC<{ patent: PatentDocument}> = ({ patent }) => {
  const { inventor, applicant, class_cpc, class_ipcr } = patent;
  return <div className={'flex'}>
    <div className={'basis-6/12'}>
      <FormatApplicant applicant={applicant} label="Applicant" />
      <FormatApplicant applicant={inventor} label="Inventor" />
    </div>
    <div className={'basis-6/12'}>
      <FormatClass class={class_cpc} label="CPC" />
      <FormatClass class={class_ipcr} label="IPC" />
    </div>
  </div>;
}