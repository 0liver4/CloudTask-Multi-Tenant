import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const teamId = req.query.teamId;

            let query = supabase.from("tasks").select("*");

            if (teamId) {
                query = query.eq("team_id", teamId);
            }

            const { data, error } = await query.order("created_at", { ascending: false });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json(data ?? []);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === "POST") {
        try {
            const { title, description, priority, status, team_id } = req.body || {};

            if (!title || !description || !priority || !status || !team_id) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const { data, error } = await supabase
                .from("tasks")
                .insert([{ title, description, priority, status, team_id }])
                .select();

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(201).json(data ?? []);
        } catch (error) {
            return res.status(400).json({ error: error.message || "Invalid request body" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
