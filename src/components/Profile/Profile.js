import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileDetails } from "../../store/actions/profileDetails";
import GeneralInfo from "./GeneralInfo/GeneralInfo";

const Profile = ({match}) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  let genInfo = {};

  useEffect(() => {
    if (profile?.id !== match.params.id) {
      dispatch(getProfileDetails(match.params.id));
    }
  }, [match.params.id, dispatch, profile?.id]);

  if (!profile) {
        return <h1 className="no-data">Profile not found!</h1>;
    } else {
        genInfo = profile.employee;
    }

  return (
        <section className="Profile">
            <div className="profile-top">
                <h3 className="EmployeeName underlined">
                  {genInfo.fullName}
                </h3>
            </div>
            <div className="block">
                <GeneralInfo
                    employeeId={genInfo.id}
                    fullName={genInfo.fullName}
                    fullNameRu={genInfo.fullNameRu}
                    gender={genInfo.gender}
                    birthDate={genInfo.birthDate}
                    email={genInfo.email}
                    phone={genInfo.phone}
                    employmentDate={genInfo.employmentDate}
                    dismissDate={genInfo.dismissDate}
                    position={genInfo.position}
                    seniority={genInfo.seniority || ""}
                    unit={genInfo.unit.name}
                    manager={genInfo.unit.manager}
                />
            </div>

        </section>
    );
};

export default Profile;