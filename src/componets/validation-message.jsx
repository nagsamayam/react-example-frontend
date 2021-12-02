export const ValidationMessage = (props) => {
    return (
        <div className="invalid-feedback">{props.field?.message}</div>
    );
};
  