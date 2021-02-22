import './Modal.scss';

function Modal(props) {

    let modalClasses = "Modal";
    if(props.show) modalClasses += " show";

    let bgclick = (e) => {
        if(e.target == e.currentTarget) {
            props.hide();
        }
    };

    return (
        <div className={modalClasses} onClick={bgclick}>
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