export function calculateScore({
    easyLeetcode = 0,
    mediumLeetcode = 0,
    hardLeetCode = 0,
    gfgCodingScore = 0,
    githubRepos = 0,
}) {
    const LC_EASY = 10; 
    const LC_MED = 30; 
    const LC_HARD = 90; 

    const lcRaw =
        LC_EASY * easyLeetcode +
        LC_MED * mediumLeetcode +
        LC_HARD * hardLeetCode;

    const hardnessBonus = Math.min(
        1.5,
        1 + 0.02 * hardLeetCode + 0.005 * mediumLeetcode
    );
    const leetcodeScore = Math.round(lcRaw * hardnessBonus);

    const GFG_MULT = 8.5;
    const gfgScore = Math.round((Number(gfgCodingScore) || 0) * GFG_MULT);

    const POINTS_PER_REPO = 375; 
    const githubScore = Math.round(
        (Number(githubRepos) || 0) * POINTS_PER_REPO
    );

    return leetcodeScore + gfgScore + githubScore;
}