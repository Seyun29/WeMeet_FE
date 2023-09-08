import { axiosPrivate } from "./axios";
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import mime from "mime";

const TEAM_INQUIRY_URL = "/team";
const TEAM_GENERATE_URL = "/team";

const teamInquiryApi = async (navigation, controller) => {
  try {
    const response = await axiosPrivate.get(TEAM_INQUIRY_URL, {
      signal: controller.signal,
    });
    console.log("TeamInquiryApi response data :", response.data);
    if (response.data.status == "SUCCESS" && response.data.data.hasTeam) {
      return true;
    } else return false;
  } catch (err) {
    if (err == "LOGOUT") {
      Alert.alert("로그아웃 되었습니다.", "다시 로그인해주세요.");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "PhoneNum" }],
        })
      );
    } else {
      // Alert.alert("오류","팀 정보를 불러오는 중 오류가 발생했습니다."); //오류발생시 분기하는 페이지로 이동하게 수정...
      if (err.response) {
        console.log(
          "teamInquiryApi : ",
          "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.",
          err.response
        );
      } else if (err.request) {
        console.log(
          "teamInquiryApi : ",
          "요청이 이루어 졌으나 응답을 받지 못했습니다.",
          err.request._response
        );
      } else {
        console.log(
          "teamInquiryApi : ",
          "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.",
          err.message
        );
      }
    }
    return false;
  }
};
const teamGenerateApi = async (images, data, navigation, controller) => {
  //이미지와 Object Data를 받아서 multipart/ form으로 보내기
  //images = 사진 데이터 객체 리스트 (pickImageAsync의 result.assets)
  //아 몰랑 내일할래
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images", {
      uri: image.uri,
      type: mime.getType(image.uri),
      name: image.uri.split("/").pop(),
    });
  });
  const stringified = JSON.stringify(data);
  formData.append("data", { string: stringified, type: "application/json" });
  // console.log("teamGenerateApi, formData :", formData);
  try {
    const response = await axiosPrivate.post(TEAM_GENERATE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: controller.signal,
    });
    console.log("TeamGenerateApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      Alert.alert("팀 생성 성공!", "이제 매칭을 신청하고 수락할 수 있어");
      return true;
    }
  } catch (err) {
    if (err == "LOGOUT") {
      Alert.alert("로그아웃 되었습니다.", "다시 로그인해주세요.");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "PhoneNum" }],
        })
      );
    } else if (err.response) {
      console.log(
        "teamGenerateApi : ",
        "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
        // err.response._response
        //  Object.keys(err.response)
      );
    } else if (err.request) {
      console.log(
        "teamGenerateApi : ",
        "요청이 이루어 졌으나 응답을 받지 못했습니다.",
        err.request._response
      );
    } else {
      console.log(
        "teamGenerateApi : ",
        "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.",
        err.message
      );
    }
  }
  Alert.alert("팀 생성 실패", "잠시 후 다시 시도해줘");
  return false;
};

export { teamInquiryApi, teamGenerateApi };
