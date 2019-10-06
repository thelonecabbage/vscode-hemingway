const vscode = require('vscode');
const hemingway = require('./hemingway')
const decorations = require('./decorations')

function blockToDecoration(activeEditor, block, hoverMessage = undefined) {
    const startPos = activeEditor.document.positionAt(block.start);
    const endPos = activeEditor.document.positionAt(block.end);
    return { range: new vscode.Range(startPos, endPos), hoverMessage };   
}
function updateTextEditor({ document, contentChanges }) {
    let activeEditor = vscode.window.activeTextEditor;
    const docTxt = document.getText();

    // console.log("paragraphs", hemingway.getSentences(document.getText()))
    // hemingway.scoreBlock({
    //     txt: document.getText()
    // })

    const sentences = hemingway.getSentences(docTxt)
    const complexWords = hemingway.getComplex(docTxt)
    const adverbs = hemingway.getAdverbs(docTxt)
    const qualifiers = hemingway.getQualifiers(docTxt)
    const passive = hemingway.getPassive(docTxt)
    
    console.log({
        sentences,
        complexWords,
        adverbs,
        qualifiers,
        passive
    })

    // let match
    // while (match = rgxNumbers.exec(document.getText())) {
    //     const startPos = activeEditor.document.positionAt(match.index);
    //     const endPos = activeEditor.document.positionAt(match.index + match[0].length);
    //     const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'Number **' + match[0] + '**' };
    //     decorations.push(decoration)
    // }

    activeEditor.setDecorations(decorations.adverb, [])
    activeEditor.setDecorations(decorations.adverb, 
        adverbs.map(b => blockToDecoration(activeEditor, b)))

    activeEditor.setDecorations(decorations.qualifier, [])
    activeEditor.setDecorations(decorations.qualifier, 
            qualifiers.map(b => blockToDecoration(activeEditor, b)))

    activeEditor.setDecorations(decorations.passive, [])
    activeEditor.setDecorations(decorations.passive, 
            passive.map(b => blockToDecoration(activeEditor, b)))
        
    activeEditor.setDecorations(decorations.complexWord, [])
    activeEditor.setDecorations(decorations.complexWord, 
            complexWords.map(b => blockToDecoration(activeEditor, b, `${b.alt.join(', ')}` )))

    activeEditor.setDecorations(decorations.hardSentence, [])
    activeEditor.setDecorations(decorations.hardSentence, 
            sentences
            .filter(b => b.wordCount >= 14 && b.level >= 10 && b.level < 14)
            .map(b => blockToDecoration(activeEditor, b)))

    activeEditor.setDecorations(decorations.veryHardSentence, [])
    activeEditor.setDecorations(decorations.veryHardSentence, 
            sentences
            .filter(b => b.wordCount >= 14 && b.level >= 14)
            .map(b => blockToDecoration(activeEditor, b)))
}
module.exports = {
    updateTextEditor
}