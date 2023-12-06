import { Input } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faSpinner  } from '@fortawesome/free-solid-svg-icons';    // faAndroid, faUserCircle, faQuestion



export default function PeopleData() {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPeople = async () => {
    try {
      setLoading(true); // Set loading to true before making the request
      const response = await axios.get("https://swapi.dev/api/people/");
      setPeople(response.data.results);
      setFilteredPeople(response.data.results);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  // const getSpeciesIcon = async () => {
  //   try {
  //     const speciesResponse = await axios.get("https://swapi.dev/api/species/");
  //     const speciesName = speciesResponse.data.name;

  //     if (speciesName.toLowerCase().includes("droid")) {
  //       return faAndroid;
  //     } else if (speciesName.toLowerCase().includes("human")) {
  //       return faUserCircle;
  //     } else {
  //       return faQuestion;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return faQuestion; // Default to question mark if there's an error fetching species data
  //   }
  // };

  const columns = [
    // {
    //   name: "Icon",
    //   cell: async (person) => {
    //     const speciesUrl = person.species[0]; // Assuming only one species for simplicity
    //     const icon = await getSpeciesIcon(speciesUrl);
    //     return <FontAwesomeIcon icon={icon} />;
    //   },
    // },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Height",
      selector: (row) => row.height,
    },
    {
      name: "Mass",
      selector: (row) => row.mass,
    },
    {
      name: "Hair Color",
      selector: (row) => row.hair_color,
    },
    {
      name: "Eye Color",
      selector: (row) => row.eye_color,
    },
    {
      name: "Birth Year",
      selector: (row) => row.birth_year,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
  ];

  useEffect(() => {
    getPeople();
  }, []);

  useEffect(() => {
    const result = people.filter((people) => {
      return people.name.toLowerCase().match(search.toLowerCase());
    });

    setFilteredPeople(result);
  }, [search, people]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
        <p style={{ fontSize: '40px', marginTop: '10px' }}>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <FontAwesomeIcon icon={faExclamationCircle} size="2xl" style={{ color: 'red' }} />
        <p style={{ fontSize: '40px', marginTop: '10px' }}>Error fetching data. Please try again later.</p>
      </div>
    );
  }

  return (
    <DataTable
      title="People List"
      columns={columns}
      data={filteredPeople}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="340px"
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search here.."
          className=" w-25 form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      customStyles={{
      headRow: {
        fontWeight: '800',
        color: '#333',
      },
    }}
    />
  );
}
