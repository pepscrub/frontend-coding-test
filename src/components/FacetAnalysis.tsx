import { Aggregation } from "@/models/Aggregation";
import { theme } from "@/theme";
import { FC, useEffect, useState } from "react";
import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DarkModeController, useDarkMode } from "./DarkModeController";

interface Props {
  aggregation: Aggregation;
  hint?: string;
  title?: string;
}

export const FacetAnalysis: FC<Props> = ({ aggregation, hint, title }) => {
  const data = aggregation.buckets.map(({ key, doc_count }) => ({ name: new Date(key).getFullYear(), doc_count }))
  const [resetContainer, setResetContainer] = useState<number | string>(800);
  const { backgroundColor } = useDarkMode();
  // Work around first render bug with recharts
  // https://github.com/recharts/recharts/issues/2268
  useEffect(() => setResetContainer('100%'), []);

  return (
    <div>
      {title && <h1 aria-label="bar-chart-title" className={'text-2xl'}>{title}</h1>}
      <ResponsiveContainer
        className={"my-6"}
        width={resetContainer}
        height={resetContainer}
      >
        <BarChart
          aria-label="bar-chart"
          width={600}
          height={600}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Tooltip
            content={({ payload, label }) => (
              <div className="recharts-custom-tooltip p-2" style={{ backgroundColor }}>
                <p className="tooltip-label font-bold text-white">{label}</p>
                {payload?.length &&
                  payload.map(({ name, color, value }, index) => {
                    const hintColor = color ?? '#fff';
                    return (
                      <p key={index} className="tooltip-items text-white">
                        {`${name === 'doc_count' ? 'Document Count' : name}: `}
                        <span className={'font-semibold'} style={{ color: hintColor }}>{`${value}`}</span>
                      </p>
                    );
                  })}
              </div>
            )}
          />
          <Bar dataKey="doc_count" fill={theme.brand} activeBar={<Rectangle fill={theme.brand} stroke={backgroundColor} />} />
          <XAxis dataKey="name" />
          <YAxis />
        </BarChart>
      </ResponsiveContainer>
      {hint && <h3 aria-label="bar-chart-hint" className={'text-xl text-center'}>{hint}</h3>}
    </div>
  )
}

export const SBFacetAnalysis: FC<Props> = (props) => (
  <DarkModeController>
    <FacetAnalysis {...props} />
  </DarkModeController>
)