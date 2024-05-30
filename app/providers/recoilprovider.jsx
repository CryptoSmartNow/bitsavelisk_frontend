import { RecoilRoot } from "recoil"

export default function RecoilcontextProvider({ children }) {
    return <RecoilRoot>
        {children}
    </RecoilRoot>
}