import './Modal.scss';

function Modal(props) {

    let modalClasses = "Modal";
    if(props.show) modalClasses += " show";

    return (
        <div className={modalClasses}>
            <div className="inner">
                <div className="title">
                    <span>{props.title}</span><div onClick={props.hide}>X</div>
                </div>
                <div className="content">
                    {props.content}
                </div>
            </div>
        </div>
    )
}

export default Modal;