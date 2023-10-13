import FileUpload from "./FileUpload";

export default function Payouts(props: { setLoading: (loading: boolean) => void }) {
  const submitFile = (file: File) => {
  }

  return (
    <FileUpload submitFile={submitFile} setLoading={props.setLoading} />
  );
}
