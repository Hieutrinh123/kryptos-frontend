
interface NotiItems {
    type: string;
    avt: string;
    title: string;
    desc: string;
    time: string;
}



export const datas: NotiItems[] = [
    {
        type: 'post',
        desc: 'da dang mot bai viet moi',
        avt: '',
        time: '1 gio truoc',
        title: 'bai viet'
    },
    {
        type: 'author',
        desc: 'bai viet co them 10 binh luan moi',
        avt: '',
        time: '',
        title: 'tac gia'
    }
]

export type { NotiItems }