const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
	roles: state => state.user.roles,
	user_info: state => state.user.user_info,
	backgroundStyle: state => state.common.backgroundStyle,
    errorLogs: state => state.errorLog.logs
}
export default getters
