const dictionary = require('./hemingway_dictionary')

const rgx = {
    paragraphs: /[^\r\n]+((\r|\n|\r\n)[^\r\n]+)*/gi,
    sentences: /[^\.\!\?]*[\.\!\?]/gi,
    words: /[\w-]+/gi,
    lyWords: /[\w-]+ly/gi,
    qualifiers: new RegExp(dictionary.qualifyingWords.join('|'), 'gim'),
    complexWords: new RegExp(Object.keys(dictionary.complexWords).join('|'), 'gim'),
    passiveVoice: new RegExp(`(${dictionary.passivePreWords.join('|')})\\s+([\\w-]+ed)`, 'gim')
}

function getTextBlocks(txt, rgx, offset = 0) {
    let match
    let blocks = []
    while (match = rgx.exec(txt)) {
        const matchTxt = match[0].trimLeft()
        const startIdx = match.index + (match[0].length - matchTxt.length) + offset;
        const endIdx = startIdx + matchTxt.length;
        if (matchTxt.trim().length > 0) {
            blocks.push({
                start: startIdx,
                end: endIdx,
                txt: matchTxt
            })
        }
    }
    return blocks
}

function getParagraphs(txt, offset = 0) {
    return getTextBlocks(txt, rgx.paragraphs, offset)
}

function getSentences(txt, offset = 0) {
    return getTextBlocks(txt, rgx.sentences, offset)
        .map(block => {
            let words = matchAll(block.txt, rgx.words).map(m => m[0].toLowerCase())
            let letters = words.join('').length
            return {
                ...block,
                wordCount: words.length,
                level: calculateLevel(letters, words.length, 1)
            }
        })
}

function getWords(txt, offset = 0) {
    return getTextBlocks(txt, rgx.words, offset)
}

function getQualifiers(txt, offset = 0) {
    return getTextBlocks(txt, rgx.qualifiers, offset)
}

function getPassive(txt, offset = 0) {
    return getTextBlocks(txt, rgx.passiveVoice, offset)
}

function getComplex(txt, offset = 0) {
    const wordAlts = dictionary.complexWords;
    return getTextBlocks(txt, rgx.complexWords, offset)
        .map(b => {
            return {
                ...b,
                alt: wordAlts[b.txt.toLowerCase()]
            }
        })
}

function getAdverbs(txt, offset = 0) {
    const lyWords = dictionary.LYWords;
    return getTextBlocks(txt, rgx.lyWords, offset)
        .filter(b => !lyWords[b.txt.toLowerCase()])
}

function matchAll(txt, rgx) {
    let result = []
    let match
    while (match = rgx.exec(txt)) {
        result.push(match)
    }
    return result
}

function calculateLevel(letters, words, sentences) {
    if (words === 0 || sentences === 0) {
        return 0;
    }
    let level = Math.round(
        4.71 * (letters / words) + 0.5 * words / sentences - 21.43
    );
    return level <= 0 ? 0 : level;
}

module.exports = {
    getParagraphs,
    getSentences,
    getWords,
    getQualifiers,
    getPassive,
    getComplex,
    getAdverbs
}
