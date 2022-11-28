import Link from "next/link"
import MainLayout from "../../public/components/layouts/mainLayoutShell.js"
import React from 'react';


class SystemAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessMockDb: {
                "BusinessDictionary": {
                    1: {
                        "businessId": 1,
                        "businessName": "Mark's Tools",
                        "industry": "Agriculture",
                        "director": "Komodo Dragon",
                    },
                    2: {
                        "businessId": 4,
                        "businessName": "Jakob's Ladder",
                        "industry": "Furniture",
                        "Director": "Jason Todd",
                    },
                    3: {
                        "businessId": 20,
                        "businessName": "Larry's Birds",
                        "industry": "Pets",
                        "director": "Michael Jordan",
                    },
                    4: {
                        "businessId": 6,
                        "businessName": "Ace Chemicals",
                        "industry": "Chemicals",
                        "Director": "Jack Napier",
                    },
                    5: {
                        "businessId": 5,
                        "businessName": "Archie's Hill",
                        "industry": "Jelly",
                        "Director": "Noa Sundqvist",
                    },
                }
            },

            pageName: 'System Admin ',
            //Would be ideal to store these in some sort of cookie or global variable
            //if these are not present then the nav bar will default to standard ESM nav bar 
            isAdmin: true,
        };
    }

    displayTableData = () => {
    //put a function in here to loop through
    }

    render() {
        return <div>
            <MainLayout isAdmin={this.state.isAdmin}  pageName={this.state.pageName}>
                <div className="whiteBackground mt-5">
                    <h1>System Admin </h1>
                </div>

                <div className="whiteBackground mt-5">
                    <h1>System Admin </h1>
                </div>


            </MainLayout >
        </div >
    }

}

export default SystemAdmin
