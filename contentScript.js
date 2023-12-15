
function getReactionMenu() {
    return document.querySelector('button[aria-label*="reaction" i]');
}

function getReactions() {
    const reactions = document.querySelectorAll('[aria-label*="reactions" i] button');
    if (reactions.length === 0) {
        throw new Error("No reactions found");
    }
    return reactions;
}

async function openMenu() {
    return new Promise(resolve => {
        const reactionMenu = getReactionMenu();
        if (!reactionMenu) {
            throw new Error("No reaction menu found");
        }
        if (reactionMenu && reactionMenu.getAttribute('aria-expanded') !== 'true') {
            reactionMenu.click();
            setInterval(() => {
                resolve();
            }, 0);
        } else {
            resolve();
        }
    });
}

/**
 * 
 * @param {KeyboardEvent} event
 * @returns {number}
 */
function getKeyIndex(event) {
    if (!event.ctrlKey || !event.metaKey) {
        return -1;
    }
    try {
        return parseInt(event.key) - 1;
    } catch (e) {
        return -1;
    }
}


document.addEventListener('keydown', async (event) => {
    const keyIndex = getKeyIndex(event);
    if (!keyIndex === -1) {
        return;
    }
    await openMenu();
    const reactions = await getReactions();
    if (reactions.length <= keyIndex) {
        console.log(`Key pressed out of range ${ keyIndex } > ${ reactions.length }`);
        return;
    }
    reactions[keyIndex].click();
});