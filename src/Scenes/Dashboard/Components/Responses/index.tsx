import "../../index.css"
import {useState} from "react";
import addImg from "../../images/Vector.png";

export default function Responses(){
    const [responses, setResponses] = useState<string[]>(["utter_sample1","utter_sample2","utter_sample3"]);

    return <div className="responses content-3">
        <div className="responses-title">
            <div className="one">
                Responses
                <img className="addImgResponses" src={addImg} />
            </div>
            <div className="responses-list">
                {
                    responses.map((item,index) => {
                        return <div style={{display: "flex"}}>
                            {item}
                            <div style={{marginLeft: "2vw"}}>edit</div>
                        </div>
                    })
                }
            </div>
        </div>
        <div className="responses-title">
            <div className="one">
                Response variants
            </div>
        </div>

    </div>
}