import { Workspace, MarkdownView, Vault, TFile, normalizePath } from 'obsidian';

// Remove Widgets in CodeMirror Editor
const clearWidges = (cm: CodeMirror.Editor) => {

    var lastLine = cm.lastLine();

    for(let i=0; i <= lastLine; i++){

        // Get the current Line
        const line = cm.lineInfo(i);

        // Clear the image widgets if exists
        if (line.widgets){
            for(const wid of line.widgets){
                if (wid.className === 'oz-image-widget'){
                    wid.clear()
                }
            }
        }
        
    }
}

// Http, Https Link Check
const filename_is_a_link = (filename: string) => filename.startsWith('http');

 // Image Name and Alt Text
const getFileNameAndAltText =(linkType: number, match: any) => {

    /* 
       linkType 1: [[myimage.jpg|#x-small]]
       linkType2: ![#x-small](myimage.jpg) 
       returns { fileName: '', altText: '' }   
    */

    var file_name_regex;
    var alt_regex;

    if(linkType == 1){
        file_name_regex = /(?<=\[\[).*(jpe?g|png|gif)/;
        alt_regex = /(?<=\|).*(?=]])/;
    } else if(linkType == 2){
        file_name_regex = /(?<=\().*(jpe?g|png|gif)/;
        alt_regex = /(?<=\[)(^$|.*)(?=\])/;
    }

    var file_match = match[0].match(file_name_regex);
    var alt_match = match[0].match(alt_regex);

    return { fileName: file_match ? file_match[0] : '', 
            altText: alt_match ? alt_match[0] : '' }

}    

// Getting Active Markdown File
const getActiveNoteFile = (workspace: Workspace) => {
    return (workspace.activeLeaf.view as MarkdownView).file;
}

// Get Active Editor
const getCmEditor = (workspace: Workspace): CodeMirror.Editor => {
    return workspace.getActiveViewOfType(MarkdownView)?.sourceMode?.cmEditor
}

const getPathOfVault = (vault: Vault): string => {
    return 'app://local' + vault.adapter.basePath
}

// Temporary Solution until getResourcePath improved 
const getPathOfImage = (vault: Vault, image: TFile) => {
    // vault.getResourcePath(image) 
    return getPathOfVault(vault) + '/' + image.path
}

export { clearWidges, filename_is_a_link, getFileNameAndAltText,
    getActiveNoteFile, getCmEditor, getPathOfImage };