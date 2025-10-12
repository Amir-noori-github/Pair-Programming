import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null); // store fetched property
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");

  // Location fields
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Get token from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) throw new Error("Failed to fetch property");
        const data = await res.json();
        setProperty(data);

        // Populate form fields
        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setPrice(data.price);
        setSquareFeet(data.squareFeet);
        setYearBuilt(data.yearBuilt);

        if (data.location) {
          setAddress(data.location.address);
          setCity(data.location.city);
          setState(data.location.state);
          setZipCode(data.location.zipCode);
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Update property
  const updateProperty = async (updatedProperty) => {
    try {
      console.log("Updating property:", updatedProperty);
      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ enforce auth
        },
        body: JSON.stringify(updatedProperty),
      });
      if (!res.ok) throw new Error("Failed to update property");
      return true;
    } catch (err) {
      console.error("Error updating property:", err);
      return false;
    }
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();

    const updatedProperty = {
      id,
      title,
      type,
      description,
      price: Number(price),
      squareFeet: Number(squareFeet),
      yearBuilt: Number(yearBuilt),
      location: {
        address,
        city,
        state,
        zipCode,
      },
    };

    const success = await updateProperty(updatedProperty);
    if (success) {
      console.log("Property Updated Successfully");
      navigate(`/properties/${id}`);
    } else {
      setError("Failed to update the property");
    }
  };

  return (
    <div className="create">
      <h2>Update Property</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <form onSubmit={submitForm}>
          <label>Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Studio">Studio</option>
          </select>

          <label>Description:</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label>Price ($):</label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label>Square Feet:</label>
          <input
            type="number"
            required
            value={squareFeet}
            onChange={(e) => setSquareFeet(e.target.value)}
          />

          <label>Year Built:</label>
          <input
            type="number"
            required
            value={yearBuilt}
            onChange={(e) => setYearBuilt(e.target.value)}
          />

          <label>Address:</label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label>City:</label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label>State:</label>
          <input
            type="text"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <label>Zip Code:</label>
          <input
            type="text"
            required
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />

          <button type="submit">Update Property</button>
        </form>
      )}
    </div>
  );
};

export default EditPropertyPage;
