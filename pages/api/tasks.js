import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {

    switch (req.method) {
        case "GET":
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
        break;
        case "POST":
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

                return res.status(201).json(data);
            } catch {
                return res.status(400).json({ error: "Invalid request body" });
            }

            return res.status(405).json({ error: "Method not allowed" });
        break;
    }
}