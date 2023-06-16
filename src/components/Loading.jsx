import { TailSpin } from 'react-loader-spinner';

function Loading() {
    return <div style={{ textAlign: "center" }}>
        <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{ display: "block", marginTop: "40px" }}
            wrapperClass=""
            visible={true}
        />
    </div>
}

export default Loading;