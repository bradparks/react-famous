import RenderNode from 'famous/core/RenderNode';
import SequentialLayout from 'famous/views/SequentialLayout';
import toPlainObject from 'lodash/lang/toPlainObject';
import React from 'react';

import FamousMixin from '../lib/FamousMixin';

export default React.createClass({
  mixins: [FamousMixin],

  famousCreate() {
    let sequentialLayout = new SequentialLayout(this.props.options);
    this.setFamous(sequentialLayout);
    this.setFamousNode(this.getFamousParentNode().add(sequentialLayout));

    let sequence = this.props.children.map(() => new RenderNode());
    sequentialLayout.sequenceFrom(sequence);
    this.setFamousKeyedNodes(toPlainObject(sequence));
  },

  famousUpdate(nextProps) {
    let sequentialLayout = this.getFamous();

    sequentialLayout.setOptions(nextProps.options);
  },

  render() {
    if (!this.getFamousReady()) { return null; }

    return (
      <div data-famous="SequentialLayout">
        {this.props.children.map((child, key) => React.cloneElement(child, {key}))}
      </div>
    );
  }
});
