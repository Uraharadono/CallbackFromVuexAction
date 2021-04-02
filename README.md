# Toaster (or any other callback) from Vuex store

## If you dont care about text below

**BASIC TL;DR:** Call `Toastr / Toaster` from `Vuex Action` ! 

**A bit longer TL;DR:** I created `Toastr` callback with `Vue SweetAlter / vue-sweetalert2` (https://github.com/avil13/vue-sweetalert2)  to show off how can callbacks be handled from `Vuex Store Actions` without breaking state pattern. 

## Installation
0.) Clone or copy repo

1.) `npm install`

2.) `npm run build`

3.) Go to **About** page for instant demo, or to **Todo** page to see how this can be implemented into already existing project. 
In this case it is for [Vuex Todo Manager](https://github.com/bradtraversy/vuex_todo_manager  "Vuex Todo Manager") by [bradtraversy](https://github.com/bradtraversy "bradtraversy"). 
Thanks mate for your help with learning Vuex.


### WHY?
Many times I needed to call something after action in store has been completed. 
I usually do my `Ajax` calls from `Vuex Actions` and I was always confused how to specify **loading**, **show toaster** or any kind of **message** that would usually be called if **ajax has failed to succeeded**.

I demoed this here on toaster, but it can be used for anything really, like loader or re-routing. 

### EASY SOLUTION
I wanted to call `Sweet Alert Toaster` in my `Vuex Action` to show info about `Ajax call` I made.
But we cannot  call    ` this.$swal`from our state, actions or mutations.

Googling: 
> how to call toaster from Vuex action
 
I encountered this topic: https://stackoverflow.com/q/57448027/4267429

Simple (or in my opinion **SCRIPT KIDDIE** ) solution proposed was to use:    

        this._vm.$bvModal.show('modalId');
Or in my case :    

	this._vm.$swal('Hello Vue world!!!');

## HOWEVER! THIS IS ANTI PATTERN !

### Getting somewhere 
I tried to use something like [THIS](https://forum.vuejs.org/t/giving-feedback-from-vuex-async-actions/45200/5m-vuex-async-actions/45200/5 "THIS"), but unfortunately I could not benefit from it. I want total control in case `Ajax` call has different outcomes.

# Proper solution
So what I did, with a little help of idea from [HERE.](https://stackoverflow.com/a/61562512/4267429 "HERE") 

1.) I created a store for **sweet toast** (*this is only using toast config for **Sweet Alert***) called "**sweet-toast.js**"

2.) Registered it in our **Vuex store**

3.) In our `App.vue` file I created a `watch function` that watches over the state of this "**sweet-toast.js**" file.

4.) If state changes then `watch` will "**notice it**" and we can do our custom logic.

5.) Since I am watching "`ticks`" property (I needed something else, because message can stay the same, and still I would want to show it) I have to fetch **current state** of our `toast` file. That's why I have getter there.

6.) With a bit of magic, everything works now and can be used in my state machine like so:

    dispatch('sweetToast/success', "I CAN FINALLY PLAY RDR 2!", { root: true });



**NOTE: **Keep in mind we need root prop as per:  https://vuex.vuejs.org/guide/modules.html#namespacing


