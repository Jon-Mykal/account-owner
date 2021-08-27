<template>
    <tr>
        <td>{{ owner.name }}</td>
        <td>{{ owner.address }}</td>
        <td>{{ owner.dateOfBirth }}</td>
        <td>
            <Button label="Details" class="p-button" @click="onDetailsClicked"/>
        </td>
        <td>
            <Button label="Edit" class="p-button" @click="onEditClicked" />
        </td>
        <td>
            <Button label="Remove"  class="p-button" @click="onRemoveClicked"/>
        </td>
    </tr>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
export default {
    props: {
        owner: {
            required: true,
            type: Object
        }
    },
    name: "OwnerRow",
    setup (props, {emit}) {
        
        const state = reactive({
            onDetailsClicked() {
                emit('viewDetails', props.owner.ownerId);
            },
            onEditClicked() {
                emit('editOwner', props.owner.ownerId);
            },
            onRemoveClicked() {
                emit('removeOwner', props.owner.ownerId);
            }
        });

        return { ...toRefs(state)};

    }
}
</script>

<style scoped>

</style>