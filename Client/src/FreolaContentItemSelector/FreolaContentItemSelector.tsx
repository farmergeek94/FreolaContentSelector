import React, { useEffect, useState } from 'react';
import { RichTextEditorPluginOptionsBase, RichTextEditorPluginProps } from '@kentico/xperience-admin-components';
import ContentItemSelectorPane from './ContentItemSelectorPane';

export interface FreolaContentItemSelectorRichTextEditorPluginProps extends RichTextEditorPluginProps {
    pluginOptions: FreolaContentItemSelectorRichTextEditorOptions
}
export interface FreolaContentItemSelectorRichTextEditorOptions extends RichTextEditorPluginOptionsBase {
    contentType: string,
    searchColumn: string,
    name?: string,
    commandName?: string,
}

export const FreolaContentItemSelectorRichTextEditorPlugin = ({ froalaEditorConfigurator, froalaEditorRef, pluginOptions }: FreolaContentItemSelectorRichTextEditorPluginProps) => {

    const [showPane, setShowPane] = useState(false);
    

    useEffect(() => {
        const pluginIconName = 'insertMore';
        const buttonName = 'Insert ' + (pluginOptions.name ?? "Content Items");
        const commandName = pluginOptions.commandName ?? 'freolaContentItemSelector';

        froalaEditorConfigurator?.defineIcon(pluginIconName, { SVG_KEY: 'insertFile' });
        froalaEditorConfigurator?.registerCommand(commandName, {
            title: buttonName,
            icon: pluginIconName,
            undo: false,
            focus: true,
            showOnMobile: true,
            refreshAfterCallback: false,
            callback: () => {setShowPane(true)}
        });
    }, [froalaEditorConfigurator, froalaEditorRef]);

    const setContentItem = (guid: string) => {  
        if(froalaEditorRef && froalaEditorRef.current && froalaEditorRef.current.editor && froalaEditorRef.current.editor.html) {
            froalaEditorRef.current.editor.html.insert(`<sup data-guid="${guid}" data-type="${pluginOptions.contentType}">*</sup>`)
            if(froalaEditorRef.current.editor.undo) {
                froalaEditorRef.current.editor.undo.saveStep();
            }
        }
        setShowPane(false);
    }

    return (<>
        {showPane && <ContentItemSelectorPane visible={showPane} close={() => setShowPane(false)} contentType={pluginOptions.contentType} searchColumn={pluginOptions.searchColumn} select={setContentItem} title={(pluginOptions.name ?? "Content Items")} />}
        </>
    );
};