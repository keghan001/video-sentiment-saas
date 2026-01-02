"use client";

import { useState } from "react";

function CodeExamples() {
    const [activeTab, setActiveTab] = useState<"ts" | "curl">('ts');

    const tsCode = `
    //1. Get upload URL
    await fetch('/api/upload-url', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer' + YOUR_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({fileType: '.mp4'})
    }).then(res => rest.json());

    //2. Upload file to S3
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'video/mp4'},
        body: videoFile
        })

    // 3. Analyze video
    const analysis = await fetch('/api/sentiment-inference', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer' + YOUR_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key })
    }).then(res => res.json());
    `;

    const curlCode = `
    # 1. Get upload URL
    curl -X POST http://localhost:3000/api/upload-url \\
        -H "Authorization: Bearer YOUR_API_KEY" \\
        -H "Content-Type: application/json" \\
        -d '{"fileType": ".mp4"}' \\
        -o response.json
    
    # Assuming the response contains 'url' field, extract it (requires jq)
    url=$(jq -r '.url' response.json)
    
    # 2. Upload file to S3
    curl -X POST "$url" \\
        -H "Content-Type: video/mp4" \\
        --data-binary @videoFile
    
    # 3. Analyze video (assuming 'key' is in the response, extract it)
    key=$(jq -r '.key' response.json)
    curl -X POST http://localhost:3000/api/sentiment-inference \\
        -H "Authorization: Bearer YOUR_API_KEY" \\
        -H "Content-Type: application/json" \\
        -d "{\"key\": \"$key\"}"
    `;

    return (
        <div className="flex mt-3 h-fit w-full flex-col rounded-xl bg-[#eeebdda3] bg-opacity-70">
            <span className="text-sm">API Usage</span>
            <span className="mb-4 text-xs text-gray-500">
                How to use this API
            </span>

            <div className="overflow-hidden rounded-md bg-gray-900">
                <div className="flex border-b border-gray-700">
                    <button 
                        onClick={() => setActiveTab("ts")}
                        className={`px-4 py-2 text-xs ${activeTab === "ts" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-gray-300"}`}>
                        TypeScript
                    </button>
                    <button 
                        onClick={() => setActiveTab("curl")}
                        className={`px-4 py-2 text-xs ${activeTab === "curl" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-gray-300"}`}>
                        cURL
                    </button>
                </div>
                <div className="p-4">
                    <pre className="max-h-[300px] overflow-y-auto text-sm text-gray-300">
                        {activeTab === "ts" ? <code>{tsCode}</code> : <code>{curlCode}</code>}
                    </pre>
                </div>
            </div>

        </div>
    )
}

export default CodeExamples;