// services/googleCustomModel.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ API key is missing!");
} else {
    console.log("✅ API key loaded successfully!");
}

const ai = new GoogleGenAI({ apiKey });

// Helper to generate content from Gemini
async function generateContent(
    prompt,
    model = "gemini-2.0-flash",
    maxOutputTokens = 1000
) {
    const response = await ai.models.generateContent({
        model,
        config: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens,
        },
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }],
            },
        ],
    });
    return response.text;
}

export async function customModelForStudents(userStats) {
    try {
        const prompt = `
You are a world-class software engineering evaluator, career coach, and technical recruiter for top global internships and entry-level roles. 
Using ONLY the JSON provided, generate a **concise, high-impact report** under 1000 tokens with the following structure:

1) **Executive Summary**: 3 bullets, concise, quantifiable, recruiter-ready.
2) **Quant Snapshot**: key metrics from LeetCode, GFG, GitHub, with 1–2 crisp insights.
3) **Strengths**: 3 bullets, data-driven.
4) **Gaps & Risks**: 3 bullets with practical mitigation strategies.
5) **30-60-90 Plan**: high-level actionable roadmap.
6) **Final Scores**: readiness_score 0–100, sub-scores for Problem-Solving, Portfolio, Readiness/Execution.

Output in **Markdown**, and include a **machine-readable JSON block** at the end containing: readiness_score, sub-scores, top strengths, top gaps, and key metrics. 
Do not hallucinate data. Use "Unknown" if fields are missing. Ensure clarity, professionalism, and international-level rigor.

JSON Input:
${JSON.stringify(userStats, null, 2)}
`;

        const report = await generateContent(prompt, "gemini-2.0-flash", 1000);
        console.log("Report for student:", report);
        // Extract JSON if present
        let jsonData = null;
        const jsonMatch = report.match(/```json([\s\S]*?)```/);
        if (jsonMatch) {
            try {
                jsonData = JSON.parse(jsonMatch[1].trim());
            } catch (e) {
                console.warn("⚠️ Failed to parse JSON:", e);
            }
        }
        return { markdown: report, data: jsonData };
    } catch (error) {
        console.error("❌ Error generating model content:", error);
        return {
            markdown: "An error occurred while generating the review.",
            data: null,
        };
    }
}

export async function customModelForCoordinator(studentData) {
    try {
        const prompt = `
You are a world-class software engineering evaluator and internship coordinator assistant for top global companies.

You will receive an array of students with their performance stats (LeetCode, GFG, GitHub) and readiness scores. 

Your task:
1. Generate a **concise Markdown report** under 1000 tokens with:
   - Overall summary of the batch
   - Weak students (readiness < 70) with short notes
   - 3–4 actionable recommendations
   - A simple quick metrics table

2. Also produce a **JSON summary of aggregated stats only**, not per student. 
   This JSON must include:
   - average readiness, average LeetCode, GFG, GitHub
   - number of students below 70
   - number of students above 85
   - list of top 2–3 strengths
   - list of top 2–3 gaps

⚠️ Output Format:
- First, return the report in a \`\`\`markdown code block
- Then, return the aggregated data in a \`\`\`json code block

JSON Input:
${JSON.stringify(studentData, null, 2)}
`;

        const response = await generateContent(
            prompt,
            "gemini-2.0-flash",
            1000
        );
        console.log("Report for Coordinator:", response);

        // Extract Markdown
        let markdown = null;
        const mdMatch = response.match(/```markdown([\s\S]*?)```/);
        if (mdMatch) {
            markdown = mdMatch[1].trim();
        }

        // Extract JSON
        let json = null;
        const jsonMatch = response.match(/```json([\s\S]*?)```/);
        if (jsonMatch) {
            try {
                json = JSON.parse(jsonMatch[1].trim());
            } catch (e) {
                console.warn("⚠️ Failed to parse JSON:", e);
            }
        }

        return { markdown, json };
    } catch (error) {
        console.error("❌ Error generating coordinator model content:", error);
        return {
            markdown:
                "An error occurred while generating the coordinator report.",
            json: null,
        };
    }
}

export async function customModelForRecruiters(coordinatorData) {
    try {
        const prompt = `
You are a world-class **technical recruiter and hiring strategist** analyzing aggregated coordinator reports from a college. 

Each coordinator report contains:
- Markdown summaries of student performance
- JSON stats (averages, distributions, strengths, gaps)

⚠️ Important Instruction:
- Do NOT isolate weaknesses or strengths to a single platform (e.g., only LeetCode or only GFG).
- Instead, treat them collectively as indicators of **overall problem-solving ability, coding consistency, and applied skills**.

Your task is to generate a **college-wide recruiter report** under 1200 tokens with the following:

1) **Executive Summary (Recruiter View):**
   - 3–5 crisp bullets highlighting overall talent readiness, coding culture, and global competitiveness.

2) **Quantitative Snapshot (College-Level Stats):**
   - Aggregate across all coordinator JSON stats.
   - Provide:
     - Average readiness score
     - Distribution of readiness (% >85, % 70–85, % <70)
     - Average problem-solving (combine LeetCode + GFG as one metric)
     - Average GitHub repos/projects
   - Present in a simple, recruiter-friendly table.

3) **Top Strengths (College-Wide):**
   - 3–4 recruiter-relevant bullets.
   - Focus on collective coding ability, culture, and employability.
   - Avoid naming a single platform.

4) **Key Risks / Gaps:**
   - 3–4 bullets.
   - Focus on overall problem-solving readiness, project quality, or execution gaps.
   - Do not phrase weaknesses like “low GFG” or “low LeetCode” — merge them into **problem-solving or coding practice gaps**.

5) **Recruiter Recommendations:**
   - How recruiters should approach hiring from this college (roles to target, how to shortlist, red flags to watch).

⚠️ Output Format:
- First return the recruiter-facing report in a \`\`\`markdown code block
- Then return a machine-readable aggregated stats object in a \`\`\`json code block with fields:
  {
    "average_readiness_score": number,
    "distribution": { "above_85": %, "between_70_85": %, "below_70": % },
    "average_metrics": { "problem_solving": number, "github": number },
    "top_strengths": [ ... ],
    "top_gaps": [ ... ]
  }

Coordinator Data Input:
${JSON.stringify(coordinatorData, null, 2)}
`;


        const response = await generateContent(
            prompt,
            "gemini-2.0-flash",
            1200
        );

        console.log("Report for Recruiter:", response);

        // Extract Markdown
        let markdown = null;
        const mdMatch = response.match(/```markdown([\s\S]*?)```/);
        if (mdMatch) {
            markdown = mdMatch[1].trim();
        }

        // Extract JSON
        let json = null;
        const jsonMatch = response.match(/```json([\s\S]*?)```/);
        if (jsonMatch) {
            try {
                json = JSON.parse(jsonMatch[1].trim());
            } catch (e) {
                console.warn("⚠️ Failed to parse JSON:", e);
            }
        }

        return { markdown, json };
    } catch (error) {
        console.error("❌ Error generating recruiter model content:", error);
        return {
            markdown:
                "An error occurred while generating the recruiter report.",
            json: null,
        };
    }
}