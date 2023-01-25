import * as React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import Table from './Table'

function LanguagesNav({selected,onUpdateLanguage}) {
    const languages = ['All','JavaSCript','Ruby','Java','CSS','Python',]
    return (
        <select
                onChange={(e) => onUpdateLanguage(e.target.value)}
                selected={selected}
                >
                    {languages.map((language, index) => (
                        <option 
                        key={`${index}_${language}`}
                        value={language}
                        >
                        {language}
                        </option>
                    ))}
                </select>
    )
}

LanguagesNav.propType = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: "All",
            repos: null,
            error: null
        }
        this.updateLanguage = this.updateLanguage.bind(this)
    }
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null
        })

        fetchPopularRepos(selectedLanguage).then((repos) => this.setState({
                repos,
                error: null
            })
        ).catch((error) => {
            console.warn("error fetching repo: ", error)

            this.setState({
                error: `There was an error fetching the repos`
            })
        })
    }
    render() {
        const {selectedLanguage, repos, error} = this.state
        return (
            <main className='stack main-stack animate-in'>
                <div className='split'>
                    <h1>Popular</h1>
                    <LanguagesNav 
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
                </div> 
                {error && <p className='text-center error'>{error}</p>}

                {repos && <Table repos={repos} />}               
            </main>
        )
    }
}