import React from 'react'

function Result({ word, phonetics, meanings, setText }) {
    return (
        <ul>
            <li className="world">
                <div className="details meaning">
                    <h2>{word}</h2>
                    {
                        phonetics.map((phonetic, i) => {
                            return <span key={i}>{phonetic.text}</span>
                        })
                    }
                </div>
            </li>
            {
                meanings.map((meaning, i) => {
                    return (
                        <li className="contain" key={i}>
                            <strong style={{ fontWeight: 'bold' }}>noun</strong>
                            <div className="details meaning">
                                <h3>Meaning</h3>
                                {
                                    meaning.definitions.map((definition, i) => {
                                        return <p key={i}>{definition.definition}</p>

                                    })
                                }
                            </div>
                            {
                                meaning.synonyms.length !== 0 &&
                                <div className="details synonyms">
                                    <h3>Synonyms</h3>
                                    {
                                        meaning.synonyms.map((synonym, i) => {
                                            return (
                                                <span key={i} onClick={()=>setText(synonym)}>{`${synonym}, `}</span>
                                            )
                                        })
                                    }
                                </div>
                            }

                        </li>
                    )
                })
            }

        </ul>
    )
}

export default Result