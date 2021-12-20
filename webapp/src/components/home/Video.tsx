import { FC } from "react"
import {Container} from "reactstrap";

const Video: FC = () => {
    const videoUrl = "https://www.youtube-nocookie.com/embed/3TFzvjnEDAA";

    return (
        <Container style={{maxWidth: 720}}>
            <h1 className="text-center">What is Felt?</h1>
            <div className="ratio ratio-16x9">
                <iframe
                    src={videoUrl}
                    title="FELT Presentation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </Container>
    )
}

export default Video
