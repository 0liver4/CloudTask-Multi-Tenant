import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {

    const { searchParams } = new URL(request.url);

    const teamId = searchParams.get("teamId");

    let query = supabase.from("tasks").select("*");

    if (teamId) {
        query = query.eq("team_id", teamId)
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }

    return NextResponse.json(data)

}

export async function POST(request) {

    try {
        const body = await request.json();

        const {
            title,
            description,
            priority,
            status,
            team_id,
        } = body;

        if (!title || !description || !priority || !status || !team_id) {
            return NextResponse.json(
                { error: "Missing required fields", },
                { status: 400, }
            );
        }

        const { data, error } = await supabase.from("tasks").insert(
            [
                {
                    title,
                    description,
                    priority,
                    status,
                    team_id,
                },
            ]).select();

        if (error) {
            return NextResponse.json(
                { error: error.message, },
                { status: 500, }
            );
        }

        return NextResponse.json(
            data,
            { status: 201, }
        );

    } catch {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        )
    }


}