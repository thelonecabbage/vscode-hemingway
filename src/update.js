const vscode = require('vscode');
const hemingway = require('./hemingway')

const adverbDecorationType = vscode.window.createTextEditorDecorationType({
    light: {
        backgroundColor: '#c4e3f3',
        borderRadius: '3px',
        color: 'black',   
    },
    dark: {
        backgroundColor: '#c4e3f3',
        borderRadius: '3px',
        color: 'black',
     
    }
});
const qualifierbDecorationType = vscode.window.createTextEditorDecorationType({
    light: {
        backgroundColor: '#c4e3f3',
        borderRadius: '3px',
        color: 'black',   
    },
    dark: {
        backgroundColor: '#c4e3f3',
        borderRadius: '3px',
        color: 'black',
     
    }
});
const complexWordDecorationType = vscode.window.createTextEditorDecorationType({
    light: {
        backgroundColor: '#e3b7e8',
        borderRadius: '3px',
        color: 'black',   
    },
    dark: {
        backgroundColor: '#e3b7e8',
        borderRadius: '3px',
        color: 'black',
     
    }
});
const passiveDecorationType = vscode.window.createTextEditorDecorationType({
    light: {
        backgroundColor: '#c4ed9d',
        borderRadius: '3px',
        color: 'black',   
    },
    dark: {
        backgroundColor: '#c4ed9d',
        borderRadius: '3px',
        color: 'black',
     
    }
});
const hardSentenceDecorationType = vscode.window.createTextEditorDecorationType({
    light: {
        backgroundColor: '#f7ecb5',
        borderRadius: '3px',
        color: 'black',   
    },
    dark: {
        backgroundColor: '#f7ecb5',
        borderRadius: '3px',
        color: 'black',
     
    }
});
const veryHardSentenceDecorationType = vscode.window.createTextEditorDecorationType({
    light: {
        backgroundColor: '#e4b9b9',
        borderRadius: '3px',
        color: 'black',   
    },
    dark: {
        backgroundColor: '#e4b9b9',
        borderRadius: '3px',
        color: 'black',
     
    }
});
const rgxNumbers = /\d+/g;

function noop (any) {}

function blockToDecoration(activeEditor, block, hoverFunc = noop) {
    const startPos = activeEditor.document.positionAt(block.start);
    const endPos = activeEditor.document.positionAt(block.end);
    return { range: new vscode.Range(startPos, endPos), hoverMessage: hoverFunc(block) };   
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

    activeEditor.setDecorations(adverbDecorationType, [])
    activeEditor.setDecorations(adverbDecorationType, 
        adverbs.map(b => blockToDecoration(activeEditor, b)))

    activeEditor.setDecorations(qualifierbDecorationType, [])
    activeEditor.setDecorations(qualifierbDecorationType, 
            qualifiers.map(b => blockToDecoration(activeEditor, b)))

    activeEditor.setDecorations(passiveDecorationType, [])
    activeEditor.setDecorations(passiveDecorationType, 
            passive.map(b => blockToDecoration(activeEditor, b)))
        
    activeEditor.setDecorations(complexWordDecorationType, [])
    activeEditor.setDecorations(complexWordDecorationType, 
            complexWords.map(b => blockToDecoration(activeEditor, b, () => `${b.alt.join(', ')}` )))

    activeEditor.setDecorations(hardSentenceDecorationType, [])
    activeEditor.setDecorations(hardSentenceDecorationType, 
            sentences
            .filter(b => b.wordCount >= 14 && b.level >= 10 && b.level < 14)
            .map(b => blockToDecoration(activeEditor, b)))

    activeEditor.setDecorations(veryHardSentenceDecorationType, [])
    activeEditor.setDecorations(veryHardSentenceDecorationType, 
            sentences
            .filter(b => b.wordCount >= 14 && b.level >= 14)
            .map(b => blockToDecoration(activeEditor, b)))
}
module.exports = {
    updateTextEditor
}