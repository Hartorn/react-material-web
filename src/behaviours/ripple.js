import { MDCRipple } from '@material/ripple';

export default (refName = 'nativeCb', unbounded = undefined) => Component => class RippleMaterialComponent extends Component {

    componentDidMount() {
        this.ripple = new MDCRipple(this.refs[refName], unbounded);
    }

    componentWillUnmount() {
        this.ripple.destroy();
    }

}