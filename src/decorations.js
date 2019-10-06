const vscode = require('vscode');

const adverb = vscode.window.createTextEditorDecorationType({
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
const qualifier = vscode.window.createTextEditorDecorationType({
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
const complexWord = vscode.window.createTextEditorDecorationType({
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
const passive = vscode.window.createTextEditorDecorationType({
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
const hardSentence = vscode.window.createTextEditorDecorationType({
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
const veryHardSentence = vscode.window.createTextEditorDecorationType({
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

module.exports = {
    adverb,
    qualifier,
    complexWord,
    passive,
    hardSentence,
    veryHardSentence
}