import React from 'react'
import { useState } from 'react'
import '../styles/Folder.css'

export default function Folder({explorer , handleInsertNode}) {
    //console.log(explorer)
    const [expand,setExpand]=useState(false)
    const [showInput,setShowInput]=useState({
        visible:false,
        isFolder:null
    })
    const handleNewFolder=(e,isFolder)=>{
        e.stopPropagation();
        setExpand(true)
        setShowInput({
            visible:true,
            isFolder
        })
    }
    const onAddFolder=(e)=>{
        //console.log(e.keyCode)
        if(e.keyCode === 13 && e.target.value){
             //add folder/file logic
            handleInsertNode(explorer.id,e.target.value,showInput.isFolder)
            setShowInput({...showInput,visible:false})
        }
    }
    if(explorer.isFolder){
        return (
            <div style={{ marginTop: 5 }}>
                <div className="folder" onClick={()=>setExpand(!expand)}>
                    <span>🗂 {explorer.name}</span>
                    <div>
                        <button onClick={(e)=>handleNewFolder(e,true)}>Folder+</button>
                        <button onClick={(e)=>handleNewFolder(e,false)}>File+</button>
                    </div>
                </div>
                <div style={{display:expand?"block":"none",paddingLeft:20}}>
                {
                    showInput.visible &&
                    (
                    <div className='inputcontainer'>
                        <span>{showInput.isFolder?"🗂" :"📁" }</span>
                        <input 
                        type="text"
                        className='inputcontainer__input'
                        autoFocus
                        onBlur={()=>setShowInput({...showInput,visible:false})}
                        onKeyDown={(e)=>onAddFolder(e,showInput.isFolder)}/>
                    </div>
                    )

                }
                {
                    explorer.items.map((item, itemKey) => {
                        return <Folder key={item.id} explorer={item} handleInsertNode={handleInsertNode}/>
                    })
                }
                </div>
                
            </div>
      )
    }
    else{
       return <span className="file">📁{explorer.name} </span>
    }

}
