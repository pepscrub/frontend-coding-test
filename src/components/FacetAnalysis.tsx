import { Aggregation } from "@/models/Aggregation";
import { FC, useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  aggregation: Aggregation;
  hint?: string;
  title?: string;
}

export const FacetAnalysis: FC<Props> = ({ aggregation, hint, title }) => {
  const data = aggregation.buckets.map(({ key, doc_count }) => ({ name: new Date(key).getFullYear(), doc_count }))
  const [resetContainer, setResetContainer] = useState<number | string>(800);
  
  // Work around first render bug with recharts
  // https://github.com/recharts/recharts/issues/2268
  useEffect(() => setResetContainer('100%'), []);

  return (
    <div>
      {title && <h1 className={'text-2xl'}>{title}</h1>}
      <ResponsiveContainer className={"my-6"} width={resetContainer} height={resetContainer}>
        <BarChart
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
          <Bar dataKey="doc_count" fill="#0099a5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={({ payload, label }) => (
              <div className="recharts-custom-tooltip bg-current p-2">
                <p className="tooltip-label text-black font-bold">{label}</p>
                {payload?.length &&
                  payload.map(({ name, color, value }, index) => {
                    const textColor = color ?? '#000';
                    return (
                      <p key={index} className="tooltip-items text-black">
                        {`${name === 'doc_count' ? 'Document Count' : name}: `}
                        <span className={'font-semibold'} style={{ color: textColor }}>{`${value}`}</span>
                      </p>
                    );
                  })}
              </div>
            )}
          />
        </BarChart>
      </ResponsiveContainer>
      {hint && <h3 className={'text-xl text-center'}>{hint}</h3>}
    </div>
  )
}
