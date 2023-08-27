import { View, Text, Dimensions, TextInput, Keyboard } from "react-native";
import React, { useState, useMemo } from "react";
import registerStyles from "../../styles/registerStyles";
import RegisterAnimatedView from "./RegisterAnimatedView";
import { SelectList } from "react-native-dropdown-select-list";
import { univNameList, univCodeList } from "../../assets/datasets";

const labels = ["학교명", "단과대", "학번"];
function getCurrentYear() {
  const now = new Date();
  return now.getFullYear();
}
const UnivSet = ({
  stage,
  univ,
  setUniv,
  college,
  setCollege,
  setAdmissionYear,
  setStage,
}) => {
  //임시
  const currentYear = getCurrentYear() % 100;
  //useMemo활용, 최적화필요!
  const univList = [];
  univNameList.map((name, index) => {
    univList.push({ key: univCodeList[index], value: name });
  });
  const collegeList = [
    //ETC, SOCIAL, ENGINEERING, ARTS, EDUCATION, MEDICINE
    { key: "SOCIAL", value: "인문사회" },
    { key: "ENGINEERING", value: "자연공학" },
    { key: "ARTS", value: "예술체육" },
    { key: "MEDICINE", value: "의료" },
    { key: "EDUCATION", value: "교육" },
    { key: "ETC", value: "그 외" },
  ];
  const collegeObj = {
    SOCIAL: "인문사회",
    ENGINEERING: "자연공학",
    ARTS: "예술체육",
    MEDICINE: "의료",
    EDUCATION: "교육",
    ETC: "그 외",
  };
  const yearList = [
    { key: "1", value: currentYear },
    { key: "2", value: currentYear - 1 },
    { key: "3", value: currentYear - 2 },
    { key: "4", value: currentYear - 3 },
    { key: "5", value: currentYear - 4 },
    { key: "6", value: currentYear - 5 },
    { key: "7", value: currentYear - 6 },
    { key: "8", value: currentYear - 7 },
    { key: "9", value: currentYear - 8 },
    { key: "10", value: currentYear - 9 },
  ];
  const changeStage = async (stage) => {
    setStage(stage);
  };
  return (
    <>
      <View style={{ width: "100%" }}>
        <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
          {labels[stage - 1]}
        </Text>
      </View>
      {/* arrow 아이콘 검색 아이콘 변경 및 사이즈 바꾸기 + 바로 검색창 뜨게 가능한지? + 뒤로 가기 구현*/}
      {stage === 1 ? (
        <SelectList
          setSelected={setUniv}
          data={univList}
          save="key"
          boxStyles={[
            registerStyles.inputTextView,
            {
              width: Dimensions.get("window").width * 0.85,
              justifyContent: "space-between",
            },
          ]}
          inputStyles={[
            registerStyles.inputText,
            { fontSize: 18, textAlign: "left" },
          ]}
          dropdownTextStyles={{ fontSize: 15 }}
          placeholder={"대학교를 선택해줘"}
          searchPlaceholder={"학교명으로 검색"}
          notFoundText={"검색 결과가 없습니다"}
          search
          onSelect={async () => {
            await changeStage(2);
          }}
          maxHeight={160}
          dropdownStyles={{
            marginTop: 0,
            borderWidth: 2,
          }}
          dropdownItemStyles={{
            height: 35,
            justifyContent: "center",
          }}
        />
      ) : stage === 2 ? (
        <>
          <SelectList
            setSelected={setCollege}
            onSelect={async () => {
              await changeStage(3);
            }}
            data={collegeList}
            save="key"
            boxStyles={[
              registerStyles.inputTextView,
              {
                width: Dimensions.get("window").width * 0.85,
                justifyContent: "space-between",
              },
            ]}
            inputStyles={[
              registerStyles.inputText,
              { fontSize: 18, textAlign: "left" },
            ]}
            dropdownTextStyles={{ fontSize: 15 }}
            placeholder={"단과대를 선택해줘"}
            search={false}
            maxHeight={160}
            dropdownStyles={{
              marginTop: 0,
              borderWidth: 2,
            }}
            dropdownItemStyles={{
              height: 35,
              justifyContent: "center",
            }}
          />
        </>
      ) : (
        <SelectList
          setSelected={(val) => {
            setAdmissionYear(val.toString());
          }}
          data={yearList}
          save="value"
          boxStyles={[
            registerStyles.inputTextView,
            {
              width: Dimensions.get("window").width * 0.85,
              justifyContent: "space-between",
            },
          ]}
          inputStyles={[
            registerStyles.inputText,
            { fontSize: 18, textAlign: "left" },
          ]}
          dropdownTextStyles={{ fontSize: 15 }}
          placeholder={"학번을 선택해줘"}
          search={false}
          maxHeight={160}
          dropdownStyles={{
            marginTop: 0,
            borderWidth: 2,
          }}
          dropdownItemStyles={{
            height: 35,
            justifyContent: "center",
          }}
        />
      )}

      <Text
        style={[
          registerStyles.warningText,
          {
            marginLeft: "10%",
            color: "black",
            alignSelf: "flex-start",
          },
        ]}
      >
        {"한번 입력된 대학 정보는 수정이 불가능해!"}
      </Text>
      {stage === 2 ? (
        <RegisterAnimatedView
          text={univNameList[univCodeList.indexOf(univ)]}
          textStyle={{ textAlign: "left" }}
          down
        />
      ) : null}
      {stage === 3 ? (
        <>
          <RegisterAnimatedView
            text={collegeObj[college]}
            fade
            textStyle={{ textAlign: "left" }}
          />
          <RegisterAnimatedView
            text={univNameList[univCodeList.indexOf(univ)]}
            textStyle={{ textAlign: "left" }}
          />
        </>
      ) : null}
    </>
  );
};

export default UnivSet;
