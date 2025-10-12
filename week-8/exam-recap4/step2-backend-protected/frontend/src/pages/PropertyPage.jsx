import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PropertyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete property by ID
  const deleteProperty = async (propertyId) => {
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Handle delete confirmation
  const onDeleteClick = (propertyId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this property listing? ${propertyId}`
    );
    if (!confirmDelete) return;

    deleteProperty(propertyId);
    navigate("/");
  };

  return (
    <div className="property-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        property && (
          <>
            <h2>{property.title}</h2>
            <p>Type: {property.type}</p>
            <p>Description: {property.description}</p>
            <p>Price: ${property.price}</p>
            <p>
              Location: {property.location.address}, {property.location.city},{" "}
              {property.location.state} {property.location.zipCode}
            </p>
            <p>Square Feet: {property.squareFeet}</p>
            <p>Year Built: {property.yearBuilt}</p>

            <button onClick={() => onDeleteClick(property._id)}>Delete</button>
            <button onClick={() => navigate(`/properties/${property._id}/edit`)}>
              Edit
            </button>
          </>
        )
      )}
    </div>
  );
};

export default PropertyPage;

