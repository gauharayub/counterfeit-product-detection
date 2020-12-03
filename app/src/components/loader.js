import '../static/css/Loader.css'
function Loader(props) {

    if (props && props.size === 'fix') {
        return (<div className="loaderContainerFix">
            <div className="loader"></div>
        </div>)
    }
    else if (props && props.size === 'normal') {
        return <div className="loaderContainer">
            <div className="loader"></div>
        </div>
    }
    return (<div className="loaderContainerFF">
        <div className="loader"></div>
    </div>)
}
export default Loader