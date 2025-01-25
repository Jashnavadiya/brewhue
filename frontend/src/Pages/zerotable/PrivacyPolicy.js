import React from 'react'
import PdfViewerMenu from "../../components/PdfViewerMenu";

const PrivacyPolicy = () => {
    return (
        <div className=''>
            <img className="w-1/3 mx-auto mt-10" src="/images/logo.svg" />
            <PdfViewerMenu url={`/thezerotable/TheZeroTable_privacy.pdf`}/>
        </div>
    )
}

export default PrivacyPolicy
