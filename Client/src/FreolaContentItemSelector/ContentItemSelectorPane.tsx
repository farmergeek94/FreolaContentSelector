import './ContentItemSelectorPane.css'
import React, { useEffect, useState } from 'react';
import { BarItem, Button, Column, Icon, Input, Paper, SidePanel, SidePanelSize } from '@kentico/xperience-admin-components';
import { usePageCommand } from '@kentico/xperience-admin-base';

interface ContentItem {
    contentItemName: string,
    contentItemGUID: string
}

interface PaneProps {
    visible: boolean
    , close: () => void
    , contentType: string
    , select: (guid: string) => void
    , searchColumn: string
    , title: string
}

let timeoutDebounce: NodeJS.Timeout

export default ({visible, close, contentType, select, searchColumn, title}: PaneProps) => {
    const [contentItems, setContentItems] = useState<ContentItem[]>([])

    const [search, setSearch] = useState("");

    const fetchContent = () => {
        return fetch(`/FreolaConfiguration/GetContentItems?contentType=${contentType}&search=${search}&searchColumn=${searchColumn}`).then(x => x.json()).then(x => setContentItems(x));
    };

    useEffect(() => {
        if(timeoutDebounce) {
            clearTimeout(timeoutDebounce)
        }
        timeoutDebounce = setTimeout(() => {
            fetchContent();
        }, 300);
    }, [search])

    return <SidePanel isVisible={visible} onClose={(e) => { close() }} size={SidePanelSize.Full} headline={"Select " + title}>
            <div style={{marginBottom: 10}}><Input placeholder='Search' value={search} onChange={e=>setSearch(e.currentTarget.value)} actionElement={<Icon name="xp-magnifier" />} /></div>
        {contentItems.map((x, i) => <div key={i} style={{ marginBottom: 10 }} onClick={() => select(x.contentItemGUID)}><Paper key={x.contentItemGUID} className="content-selector-item">
            <div dangerouslySetInnerHTML={{ __html: x.contentItemName }}></div>
                </Paper></div>)}
    </SidePanel>
}