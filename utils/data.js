const usernames = [
    'user123',
    'john_doe',
    'cool_guy',
    'coding_master',
    'user456',
    'jane_smith',
    'web_dev',
    'username1',
    'user007',
    'newbie_coder',
    'user789',
    'js_ninja',
    'code_lover',
    'user42',
    'design_guru',
    'user999',
    'web_designer',
    'user555',
    'dev_girl',
    'username2',
    'user2000',
    'tech_savvy',
    'user314',
    'coder_life',
    'user777',
    'css_wizard',
    'user100',
    'pythonista',
    'user9999',
    'ruby_rocks'
];

const thoughts = [
    "Coding is the closest thing we have to a superpower.",
    "Debugging is like detective work, there are clues everywhere.",
    "Coding is not just about what you create, but what you learn in the process.",
    "The best error message is the one that never shows up.",
    "Coding is a mix of logic, creativity, and problem-solving.",
    "Coding is like magic, but real.",
    "Coding is the language of the future.",
    "Coding is the art of turning ideas into reality.",
    "Coding is a journey of continuous learning and improvement.",
    "Coding is the ultimate form of self-expression for a computer.",
    "Coding is the key to unlocking endless possibilities.",
    "Coding allows you to build something out of nothing.",
    "Coding is a puzzle that you get to solve every day.",
    "Coding is the bridge between humans and machines.",
    "Coding is a skill that empowers you to shape the digital world.",
    "Coding is a universal language that transcends borders.",
    "Coding is the backbone of the digital age.",
    "Coding is the engine that drives innovation.",
    "Coding is the tool that transforms ideas into reality.",
    "Coding is not just about writing code, it's about solving problems."
];

const reactions = [
    "Wow, that's so true!",
    "I never thought about it that way.",
    "Coding really is magical!",
    "These thoughts are so inspiring.",
    "I feel motivated to code now.",
    "Coding is truly a unique blend of skills.",
    "I love how coding empowers us.",
    "These thoughts resonate with me.",
    "Coding is both challenging and rewarding.",
    "I agree, coding is a form of art.",
    "I can relate to these coding thoughts.",
    "Coding opens up endless opportunities.",
    "I'm amazed by the power of coding.",
    "These thoughts capture the essence of coding.",
    "Coding is such an important skill to have."
];

const emails = [
    'user123@example.com',
    'john_doe@example.com',
    'cool_guy@example.com',
    'coding_master@example.com',
    'user456@example.com',
    'jane_smith@example.com',
    'web_dev@example.com',
    'username1@example.com',
    'user007@example.com',
    'newbie_coder@example.com',
    'user789@example.com',
    'js_ninja@example.com',
    'code_lover@example.com',
    'user42@example.com',
    'design_guru@example.com',
    'user999@example.com',
    'web_designer@example.com',
    'user555@example.com',
    'dev_girl@example.com',
    'username2@example.com',
    'user2000@example.com',
    'tech_savvy@example.com',
    'user314@example.com',
    'coder_life@example.com',
    'user777@example.com'
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUsername = () => {
    return getRandomArrItem(usernames) || 'default_username';
};

const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: getRandomArrItem(thoughts),
            username: getRandomUsername(),
            reactions: getRandomReactions(3)
        });
    }
    return results;
}

const getRandomReactions = (int) => {
    if (int === 1) {
      return getRandomArrItem(reactions);
    }
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(reactions),
        username: getRandomUsername(),
      });
    }
    return results;
};

const getRandomFriends = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push(getRandomArrItem(usernames));
    }
    return results;
}

const getRandomEmail = () => {
    return getRandomArrItem(emails) || 'example@example.com';
}

module.exports = { getRandomThoughts, getRandomUsername, getRandomFriends, getRandomEmail };