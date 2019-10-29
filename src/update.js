const vscode = require('vscode');
const hemingway = require('./hemingway')
const decorations = require('./decorations')

function blockToDecoration(activeEditor, block, hoverMessage = undefined) {
    const startPos = activeEditor.document.positionAt(block.start);
    const endPos = activeEditor.document.positionAt(block.end);
    return { range: new vscode.Range(startPos, endPos), hoverMessage,
    message: hoverMessage,
    source: 'Hemingway',
    severity: vscode.DiagnosticSeverity.Warning};   
}
function blockToDiagnostic(activeEditor, block, code = '', message = undefined, severity = vscode.DiagnosticSeverity.Warning, unnecessary) {
    const startPos = activeEditor.document.positionAt(block.start);
    const endPos = activeEditor.document.positionAt(block.end);
    const range = new vscode.Range(startPos, endPos)
    const source = 'Hemingway'
    return { 
        code,
        message,        
        range,
        source,
        severity,
        relatedInformation: [
            // new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, new vscode.Range(new vscode.Position(1, 8), new vscode.Position(1, 9))), 'first assignment to `x`')
        ],
        tags: unnecessary ? [vscode.DiagnosticTag.Unnecessary] : []
    };   
}
function updateTextEditor({ document, contentChanges, diagnostics }) {
    let activeEditor = vscode.window.activeTextEditor;
    document = document || activeEditor.document
    const docTxt = document.getText();

    // console.log("paragraphs", hemingway.getSentences(document.getText()))
    // hemingway.scoreBlock({
    //     txt: document.getText()
    // })
    vscode.Diagnostic

    const sentences = hemingway.getSentences(docTxt)
    const complexWords = hemingway.getComplex(docTxt)
    const adverbs = hemingway.getAdverbs(docTxt)
    const qualifiers = hemingway.getQualifiers(docTxt)
    const passive = hemingway.getPassive(docTxt)
    
    const hardSentences = sentences.filter(b => b.wordCount >= 14 && b.level >= 10 && b.level < 14)
    const veryHardSentences = sentences.filter(b => b.wordCount >= 14 && b.level >= 14)
     
    console.log({
        sentences,
        complexWords,
        adverbs,
        qualifiers,
        // let match
        // while (match = rgxNumbers.exec(document.getText())) {
        //     const startPos = activeEditor.document.positionAt(match.index);
        //     const endPos = activeEditor.document.positionAt(match.index + match[0].length);
        //     const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'Number **' + match[0] + '**' };
        //     decorations.push(decoration)
        // }
    
        // collection.clear();
        // collection.set(document.uri, adverbs.map(b => blockToDecoration(activeEditor, b)))
        // let match
        // while (match = rgxNumbers.exec(document.getText())) {
        //     const startPos = activeEditor.document.positionAt(match.index);
        //     const endPos = activeEditor.document.positionAt(match.index + match[0].length);
        //     const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'Number **' + match[0] + '**' };
        //     decorations.push(decoration)
        // }
    
        // collection.clear();
        // collection.set(document.uri, adverbs.map(b => blockToDecoration(activeEditor, b)))
        // let match
        // while (match = rgxNumbers.exec(document.getText())) {
        //     const startPos = activeEditor.document.positionAt(match.index);
        //     const endPos = activeEditor.document.positionAt(match.index + match[0].length);
        //     const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'Number **' + match[0] + '**' };
        //     decorations.push(decoration)
        // }
    
        // collection.clear();
        // collection.set(document.uri, adverbs.map(b => blockToDecoration(activeEditor, b)))
        // let match
        // while (match = rgxNumbers.exec(document.getText())) {
        //     const startPos = activeEditor.document.positionAt(match.index);
        //     const endPos = activeEditor.document.positionAt(match.index + match[0].length);
        //     const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'Number **' + match[0] + '**' };
        //     decorations.push(decoration)
        // }
    
        // collection.clear();
        // collection.set(document.uri, adverbs.map(b => blockToDecoration(activeEditor, b)))
        // let match
        // while (match = rgxNumbers.exec(document.getText())) {
        //     const startPos = activeEditor.document.positionAt(match.index);
        //     const endPos = activeEditor.document.positionAt(match.index + match[0].length);
        //     const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'Number **' + match[0] + '**' };
        //     decorations.push(decoration)
        // }
    
        // collection.clear();
        // collection.set(document.uri, adverbs.map(b => blockToDecoration(activeEditor, b)))
        passive
    })

    diagnostics.set(document.uri, 
        [
            ...adverbs.map(b => blockToDiagnostic(activeEditor, b, 'Adverbs', `adverb`, vscode.DiagnosticSeverity.Information)),
            ...qualifiers.map(b => blockToDiagnostic(activeEditor, b, 'Qualifier Word', `qualifier`, vscode.DiagnosticSeverity.Information), true),
            ...passive.map(b => blockToDiagnostic(activeEditor, b, 'Passive Voice', `Avoid passive voice`, vscode.DiagnosticSeverity.Error)),
            ...complexWords.map(b => blockToDiagnostic(activeEditor, b, 'Complex Word', `Alternative word${b.alt.length > 1 ? 's': ''}: ${b.alt.join(', ')}`, vscode.DiagnosticSeverity.Warning, true)),
            ...hardSentences.map(b => blockToDiagnostic(activeEditor, b, 'Difficult Sentence', `Hard to read`, vscode.DiagnosticSeverity.Warning)),
            ...veryHardSentences.map(b => blockToDiagnostic(activeEditor, b, 'Difficult Sentence', `Very hard to read`, vscode.DiagnosticSeverity.Error))
        ]
    )
    

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
            complexWords.map(b => blockToDecoration(activeEditor, b)))

    activeEditor.setDecorations(decorations.hardSentence, [])
    activeEditor.setDecorations(decorations.hardSentence, 
            hardSentences.map(b => blockToDecoration(activeEditor, b)))

    activeEditor.setDecorations(decorations.veryHardSentence, [])
    activeEditor.setDecorations(decorations.veryHardSentence, 
            veryHardSentences.map(b => blockToDecoration(activeEditor, b)))

    
}
module.exports = {
    updateTextEditor
}