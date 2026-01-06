"use client";

import { useState } from "react";
import UploadVideo from "~/components/client/UploadVideo";

interface InferenceProps {
    quota: {
        secretKey: string;
    };
}

//Analysis structure to hold results from the inference call
export type Analysis = {
    utterances: {
        start_time: number;
        end_time: number;
        text: string;
        emotions: Array<{ label: string; confidence: number}>;
        sentiments: Array<{ label: string; confidence: number}>;
    };
}

export default function Inference({quota}: InferenceProps) {
    const [analysis, setAnalysis] = useState<any | null>(null);

    return (
        <div className="flex h-fit w-full flex-col gap-3 md:w-1/2">
            <h2 className="text-ls font-medium text-slate-800">Inference
            </h2>
            <UploadVideo onAnalysis={setAnalysis} apiKey={quota.secretKey}/>
        </div>
    )
}
