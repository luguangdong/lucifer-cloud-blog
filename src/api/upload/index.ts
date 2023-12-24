import {http} from '@/utils/http'
import {imageInfo, type Info} from '@/utils/imageInfo'

interface beforeUploadRes extends Info {
    url: string
    token: string
    authorization: string
    file_id: string
    cos_file_id: string
    key: string
}



export const upload = async (params: { file_name: string; file: File, path: string }): Promise<beforeUploadRes> => {
    const fromData = new FormData()
    fromData.append('file_name', params.file_name)
    fromData.append('file', params.file)
    fromData.append('path', params.path)

    let res = await http.request(
        {
            url: '/cos/upload',
            method: 'post',
            data: fromData,
        },
        {
            isShowMessage: false,
            serializeParams: false,
        },
    )

    const info = await imageInfo(params.file)
    return ({...res.data, ...info});

    // const info = await imageInfo(params.file)
    //
    // const data = new FormData()
    // data.append('key', res.data.key)
    // data.append('Signature', res.data.authorization)
    // data.append('x-cos-security-token', res.data.token)
    // data.append('x-cos-meta-fileid', res.data.cos_file_id)
    // data.append('file', params.file)
    //
    // return new Promise(async (resolve, reject) => {
    //     await http.request(
    //         {
    //             url: res.data.url,
    //             method: 'post',
    //             data: data,
    //         },
    //         {
    //             serializeParams: false,
    //             isShowMessage: false,
    //             isReturn: false,
    //         },
    //     )
    //
    //     resolve({...res.data, ...info})
    // })
}

export const delUpload = (params: { key: string }) => {
    return http.request(
        {
            url: '/upload/del',
            method: 'get',
            params,
        },
        {
            isShowMessage: false,
        },
    )
}
