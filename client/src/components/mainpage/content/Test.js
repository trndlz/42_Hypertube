import React, {
    useEffect,
    useRef,
    useState
} from 'react'

// export default function Test() {
//     const mount = useRef(false);
//     let [moncul, setMoncul] = useState(false)
//     let [toncul, setToncul] = useState(false)

//     //DIDUPDATE
//     useEffect(()=>{
//         if(mount.current){
//             console.log("Update")
//         }
//     })

//     useEffect(()=>{
//         if(mount.current){
//             console.log("Moncul Update")
//         }
//     }, [moncul])

//     useEffect(()=>{
//         if(mount.current){
//             console.log("Toncul Update")
//         }
//     }, [toncul])

//     //DIDMOUNT
//     useEffect(()=>{
//         console.log("Mount")
//         mount.current = true;
//     }, [])

//     return (
//         <div >
//             <h1>OKOK</h1>
//             <button className="btn" onClick={() => setMoncul(!moncul)}>HELLO</button>
//         </div>
//     )
// }

const MemoLink = React.memo(props => {
    console.log(props.children)
    return (
        <Link {...props}>
        { props.children }
        </Link>
    );
});