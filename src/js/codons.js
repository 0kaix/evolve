export function aminoacid2codon(name) {
    let codons = [
        {
            "codon": "AAA",
            "name": "laiansuan"
        },
        {
            "codon": "AAC",
            "name": "tiandongxianan"
        },
        {
            "codon": "AAG",
            "name": "laiansuan"
        },
        {
            "codon": "AAU",
            "name": "tiandongxianan"
        },
        {
            "codon": "ACA",
            "name": "suansuan"
        },
        {
            "codon": "ACC",
            "name": "suansuan"
        },
        {
            "codon": "ACG",
            "name": "suansuan"
        },
        {
            "codon": "ACU",
            "name": "suansuan"
        },
        {
            "codon": "AGA",
            "name": "jingansuan"
        },
        {
            "codon": "AGC",
            "name": "siansuan"
        },
        {
            "codon": "AGG",
            "name": "jingansuan"
        },
        {
            "codon": "AGU",
            "name": "siansuan"
        },
        {
            "codon": "AUA",
            "name": "yiliangansuan"
        },
        {
            "codon": "AUC",
            "name": "yiliangansuan"
        },
        {
            "codon": "AUG",
            "name": "jialiuansuan"
        },
        {
            "codon": "AUU",
            "name": "yiliangansuan"
        },
        {
            "codon": "CAA",
            "name": "guanxianan"
        },
        {
            "codon": "CAC",
            "name": "zuansuan"
        },
        {
            "codon": "CAG",
            "name": "guanxianan"
        },
        {
            "codon": "CAU",
            "name": "zuansuan"
        },
        {
            "codon": "CCA",
            "name": "puansuan"
        },
        {
            "codon": "CCC",
            "name": "puansuan"
        },
        {
            "codon": "CCG",
            "name": "puansuan"
        },
        {
            "codon": "CCU",
            "name": "puansuan"
        },
        {
            "codon": "CGA",
            "name": "jingansuan"
        },
        {
            "codon": "CGC",
            "name": "jingansuan"
        },
        {
            "codon": "CGG",
            "name": "jingansuan"
        },
        {
            "codon": "CGU",
            "name": "jingansuan"
        },
        {
            "codon": "CUA",
            "name": "liangansuan"
        },
        {
            "codon": "CUC",
            "name": "liangansuan"
        },
        {
            "codon": "CUG",
            "name": "liangansuan"
        },
        {
            "codon": "CUU",
            "name": "liangansuan"
        },
        {
            "codon": "GAA",
            "name": "guansuan"
        },
        {
            "codon": "GAC",
            "name": "tiandongansuan"
        },
        {
            "codon": "GAG",
            "name": "guansuan"
        },
        {
            "codon": "GAU",
            "name": "tiandongansuan"
        },
        {
            "codon": "GCA",
            "name": "bingansuan"
        },
        {
            "codon": "GCC",
            "name": "bingansuan"
        },
        {
            "codon": "GCG",
            "name": "bingansuan"
        },
        {
            "codon": "GCU",
            "name": "bingansuan"
        },
        {
            "codon": "GGA",
            "name": "ganansuan"
        },
        {
            "codon": "GGC",
            "name": "ganansuan"
        },
        {
            "codon": "GGG",
            "name": "ganansuan"
        },
        {
            "codon": "GGU",
            "name": "ganansuan"
        },
        {
            "codon": "GUA",
            "name": "xieansuan"
        },
        {
            "codon": "GUC",
            "name": "xieansuan"
        },
        {
            "codon": "GUG",
            "name": "xieansuan"
        },
        {
            "codon": "GUU",
            "name": "xieansuan"
        },
        {
            "codon": "UAA",
            "name": "zhongzhi"
        },
        {
            "codon": "UAC",
            "name": "laoansuan"
        },
        {
            "codon": "UAG",
            "name": "zhongzhi"
        },
        {
            "codon": "UAU",
            "name": "laoansuan"
        },
        {
            "codon": "UCA",
            "name": "siansuan"
        },
        {
            "codon": "UCC",
            "name": "siansuan"
        },
        {
            "codon": "UCG",
            "name": "siansuan"
        },
        {
            "codon": "UCU",
            "name": "siansuan"
        },
        {
            "codon": "UGA",
            "name": "zhongzhi"
        },
        {
            "codon": "UGC",
            "name": "banguangansuan"
        },
        {
            "codon": "UGG",
            "name": "seansuan"
        },
        {
            "codon": "UGU",
            "name": "banguangansuan"
        },
        {
            "codon": "UUA",
            "name": "liangansuan"
        },
        {
            "codon": "UUC",
            "name": "benbingansuan"
        },
        {
            "codon": "UUG",
            "name": "liangansuan"
        },
        {
            "codon": "UUU",
            "name": "benbingansuan"
        }
    ]
    const item = codons.find(item => item.name == name);
    if (item) {
        return item.codon
    }
}
