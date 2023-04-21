export const member_update = {
	name: 'UPDATE_MEMBER',
	async execute(data, contextSetters) {
		contextSetters.setMembers((prevMembers) => {
      const members = {...prevMembers};
      members[data.member.chronicle][data.member.user] = data.member;
			return members;
		});
	},
};