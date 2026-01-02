import { NextResponse } from "next/server";
import { checkAndUpdateQuota } from "~/lib/quota";
import { db } from "~/server/db";


export async function POST(req: Request) {
    try{
        //Get API key from the header
        const apiKey = req.headers.get("Authorization")?.replace("Bearer ", "");
        if(!apiKey){
            return NextResponse.json({error: "API key required"}, { status: 401})
        }

        //Finding API key of the user
        const quota = await db.apiQuota.findUnique({
            where: {
                secretKey: apiKey,
            },
            select: {
                userId: true
            }
        })

        if(!quota) {
            return NextResponse.json({error: "Invalid API key"}, {status : 401});
        }

        const { key } = await req.json();

        if (!key) {
            return NextResponse.json(
                {error: "Key is required"}, 
                { status: 400})
        }
        
        const file = await db.videoFile.findUnique({
            where: { key },
            select: { userId: true, analyzed: true},
        });

        if(!file) {
            return NextResponse.json({error: "File not found"}, {status: 400});
        }

        if (file.userId !== quota.userId) {
            return NextResponse.json({ error: "Unathorized"}, {status: 403});
        }

        if (file.analyzed) {
            return NextResponse.json(
                {error: "File already analyzed"},
                {status: 400},
            );
        }

        const hasQuota = await checkAndUpdateQuota(quota.userId, true);

        if (!hasQuota) {
            return NextResponse.json(
                {error: "Monthly quota exceeded"},
                {status: 429},
            )
        }

        
        return NextResponse.json({
            quota
        });
    } catch (error) {
        console.error("Upload error: ", error);
        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 });
    }
}